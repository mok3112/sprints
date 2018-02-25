from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from rest_framework import mixins


class CreateView(generics.ListCreateAPIView):
    """
    Handles GET method for all tasks.
    Handles POST method for creating a new task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET, PATCH, and DELETE methods for a single task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def retrieve(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            task = Task.objects.get(id=kwargs.get('pk'))
            serialized = TaskSerializer(task)
            return Response(serialized.data)
        else:
            raise KeyError('pk cannot be found')


