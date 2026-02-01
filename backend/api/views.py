from django.shortcuts import render
from rest_framework import generics
from . import models
from .serializers import TransactionSerializer

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = models.Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionRetreiveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = "id"