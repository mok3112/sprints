from rest_framework import serializers
from .models import Task, GlobalSettings


class TaskCreationSerializer(serializers.ModelSerializer):
    """
    Serializes task data for adding new tasks (POST), and returning a list of all tasks (GET).
    Makes the 'completed' field read-only because each task starts uncompleted by definition.
    """
    class Meta:
        model = Task
        fields = ('name', 'time', 'completed', 'id',)
        read_only_fields = ('completed',)


class TaskUpdateSerializer(serializers.ModelSerializer):
    """
    Serializes task data for GET, PATCH, and DELETE methods on one task only.
    Sets 'completed' field to writable because we can make a task completed 
    after it is created
    """
    class Meta:
        model = Task
        fields = ('name', 'time', 'completed', 'id')


class GlobalSettingsSerializer(serializers.ModelSerializer):
    """
    Serializes data for the settings of the application.
    Everything is writable as settings can be changed by the user.
    """
    class Meta:
        model = GlobalSettings
        fields = ('name', 'point_hour_ratio', 'daily_high_score', 'total_points')
