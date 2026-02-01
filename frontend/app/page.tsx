"use client"

import { useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";
import { ActivityIcon, ArrowDownCircle, ArrowUpCircle, Copyright, Github, Link, Linkedin, PlusCircle, SeparatorVerticalIcon, Trash, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

type Transaction = {
  id : string;
  description :string;
  montant : number;
  date_creation : string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [description, setDescription] = useState<String>("");
  const [montant, setMontant] = useState<Number | "">("");
  const [chargemnt, setChargement] = useState(false);

  const getTranscatoins = async()=>{
    try{
      const res = await api.get<Transaction[]>("transactions/")
      setTransactions(res.data)
    } catch (error) {
      console.error("Erreur de chargement des transactions : ",error)
    }
  }


  const supprimerTranscation = async(id : String)=>{
    try{
      await api.delete(`transactions/${id}/`)
      getTranscatoins()
      toast.success("Transactions supprimée avec succès")
    } catch (error) {
      console.error("Erreur de suppression de la transaction : ",error)
    }
  }


  const ajouterTranscation = async()=>{
    if(!description || montant === "" || isNaN(Number(montant))){
        console.error("Veuillez remplir tous les champs ")
    }
    setChargement(true)
    try{
      const res = await api.post<Transaction>(`transactions/`, {description, montant : Number(montant)} )
      getTranscatoins()
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement
      if (modal) {
        modal.close()
      }
      toast.success("Transaction ajoutée avec succès")
      setDescription("")
      setMontant("")
    } catch (error) {
      console.error("Erreur ajout de la transaction : ",error)
    }
    finally{
      setChargement(false)
    }
  }




  useEffect(()=>{
    getTranscatoins()
  }, []);

  const montants =transactions.map((t)=> Number(t.montant) || 0)
  const credit = montants.reduce((acc, item) => acc + item, 0) || 0
  const gain = montants.filter((montant) => montant > 0).reduce((acc, item) => acc + item, 0) || 0
  const depense = montants.filter((montant) => montant < 0).reduce((acc, item) => acc + item, 0) || 0
  const moyenne = gain > 0 ? Math.min((Math.abs(depense) / gain) * 100, 100) : 0

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  return (
      <div className="w-2/3 flex flex-col gap-4">
        <h1 className="font-bold text-center text-xl">Pecunia - Gérez votre budget</h1>

        <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-info/5 p-5">
          
          <div className="flex flex-col gap-1">
                <div className="badge badge-soft p-4">
                  <Wallet /> Votre solde
                </div>

            <div className="stat-value">
              {credit.toFixed(2)} €
            </div>
          </div>


          <div className="flex flex-col gap-1">
                <div className="badge badge-soft badge-success p-4">
                  <ArrowUpCircle /> Vos revenus
                </div>

            <div className="stat-value">
              {gain.toFixed(2)} €
            </div>
          </div>


          <div className="flex flex-col gap-1">
                <div className="badge badge-soft badge-error p-4">
                  <ArrowDownCircle /> Vos dépenses
                </div>

            <div className="stat-value">
              {depense.toFixed(2)} €
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-accent/5 p-5">
            <div className="flex justify-between items-center mb-1">
                <div className="badge badge-soft badge-warning p-4 gap-1">
                  <ActivityIcon/> Dépenses vs Revenus
                </div>

                <div>
                  {moyenne.toFixed(0)}%
                </div>
            </div>

            <progress className="progress progress-warning w-full"
              value={moyenne} max={100}>

            </progress>
        </div>

            
              <button className="btn btn-info" 
                onClick={()=> (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                  <PlusCircle/>Ajouter une transaction    
              </button>
              

            <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-accent/5 ">
              <table className="table">
                {/* head */}
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Montant</th>
                      <th>Date</th>
                      <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>

                    {transactions.map((t, index) =>(
                        <tr  key={t.id}>
                          <th>{index +1}</th>
                          <td>{t.description}</td>
                          <td className="font-semibold flex items-center gap-2">
                              {t.montant > 0 ? (
                                 <TrendingUp className="text-success"/>
                                ) : (
                                  <TrendingDown className="text-error"/>
                                )}
                              {t.montant > 0 ? `+${t.montant}` : `${t.montant}`}
                          </td>
                          <td>{formatDate(t.date_creation)}</td>
                          <td>
                            <button 
                              onClick={()=> supprimerTranscation(t.id)}
                            className="btn btn-small btn-error btn-soft" title="Supprimer"><Trash/></button>
                          </td>
                        </tr>
                    ))}
                  
                  
                </tbody>
              </table>
            </div>


            <dialog id="my_modal_3" className="modal backdrop-blur">
                <div className="modal-box border-2 border-warning/10 border-dashed">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Ajouter une transaction</h3>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2"> 
                      <label className="label">Description</label>
                      <input type="text" 
                      name="description" 
                      value={description} 
                      onChange={(e)=>setDescription(e.target.value)}
                      placeholder="Entrez la description..."
                      className="input w-full"/>
                    </div>

                    <div className="flex flex-col gap-2"> 
                      <label className="label">Montant (négatif : dépense, positif : revenu)</label>
                      <input type="number" 
                      name="montant" 
                      value={montant} 
                      onChange={(e)=>setMontant(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="Entrez le montant..."
                      className="input w-full"/>
                    </div>

                    <button className="btn btn-info" 
                      onClick={ajouterTranscation}
                      disabled={chargemnt}>
                        <PlusCircle/>Ajouter
                    </button>
                  </div>
                </div>
            </dialog>
                    

            <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-accent/5 p-5">
            <div className="flex flex-col items-center mb-1 gap-2">
                <div className="badge badge-soft badge-accent p-4 gap-1">
                  <Copyright /> Anis ABDAT
                </div>
                <a
                  href="https://github.com/AnisAb2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info"
                >
                  <Github />
                </a>

            </div>

        </div>
      </div>
  );
}
  
