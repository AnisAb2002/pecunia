from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "description", "montant", "date_creation"]
        read_only_fields = ["id", "date_creation"]
