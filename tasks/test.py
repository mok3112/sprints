from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse
from .models import Task


class ModelTestCases(TestCase):
    def setUp(self):
        self.task_name = 'Finish the API'
        self.task_minutes = 30

    def test_model_can_create_a_task(self):
        old_count = Task.objects.count()
        Task.objects.create(name=self.task_name, time=self.task_minutes)
        new_count = Task.objects.count()
        self.assertNotEqual(old_count, new_count)


class EndpointTestCases(TestCase):
    def setUp(self):
        self.api_client = APIClient()
        self.task_data = {'name': 'handle POST requests', 'time': 30}
        self.response = self.client.post(
            reverse('tasks:create'),
            self.task_data,
            format="json"
        )
        self.task = Task.objects.get()

    def test_api_can_create_a_task(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_can_get_a_task(self):
        response = self.client.get(
            reverse('tasks:details', kwargs={'pk': self.task.pk}),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.task)

    def test_api_can_update_a_task(self):
        changed_task = {'name': 'different name'}
        response = self.client.put(
            reverse('tasks:details', kwargs={'pk': self.task.pk}),
            changed_task
        )
        self.assertEqual(response.status_code, status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)