from rest_framework import serializers
from .models import Task


class TaskCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('name', 'time', 'completed', 'id',)
        read_only_fields = ('completed',)


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('name', 'time', 'completed', 'id')

