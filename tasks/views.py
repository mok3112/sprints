from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskCreationSerializer, TaskUpdateSerializer
from rest_framework import mixins


class CreateView(generics.ListCreateAPIView):
    """
    Handles GET method for all tasks.
    Handles POST method for creating a new task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskCreationSerializer

    def perform_create(self, serializer):
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET, PATCH, and DELETE methods for a single task.
    """
    queryset = Task.objects.all()
    serializer_class = TaskUpdateSerializer

    def retrieve(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            task = Task.objects.get(id=kwargs.get('pk'))
            serialized = TaskUpdateSerializer(task)
            return Response(serialized.data)
        else:
            raise KeyError('pk cannot be found')

    def patch(self, request, *args, **kwargs):
        new_data = None
        if 'pk' in kwargs:
            task = Task.objects.get(id=kwargs.get('pk'))
            serialized = TaskUpdateSerializer(task, data=request.data, partial=True)
            if serialized.is_valid():
                serialized.save()
                return Response(serialized.data)
            else:
                return Response(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        else:
            raise KeyError('pk cannot be found')

    def delete(self, request, *args, **kwargs):
        if 'pk' in kwargs:
            task = Task.objects.get(id=kwargs.get('pk'))
            task.delete()
            return Response(status.HTTP_200_OK)
        else:
            raise KeyError('pk not found')


