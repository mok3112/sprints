from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Task, GlobalSettings
from django.contrib.auth.models import User


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
            reverse('tasks:details', kwargs={'pk': self.task.id}),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.task)

    def test_api_can_update_a_task(self):
        changed_task = {'name': 'different name', 'time': 30, 'completed': False}
        response = self.client.patch(
            reverse('tasks:details', kwargs={'pk': self.task.id}),
            changed_task,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SettingsTestCases(TestCase):
    def setUp(self):
        self.api_client = APIClient()
        self.settings_data = {'name': 'Test Settings', 'point_hour_ratio': 3}
        self.response = self.api_client.post(
            reverse('tasks:create-settings'),
            self.settings_data,
            format='json'
        )
        self.global_settings = GlobalSettings.objects.get()

    def api_can_create_settings(self):
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)

    def api_can_get_settings(self):
        response = self.api_client.get(
            reverse('tasks:edit-settings', kwargs={'pk': self.global_settings.id}),
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthTestCases(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='mohit31', password='On1onp1zza!')
        self.api_client = APIClient()

    def api_can_get_token(self):
        data = {
            'username': 'mohit31',
            'password': 'On1onp1zza!'
        }
        response = self.api_client.post(
            reverse('tasks:get_auth_token'),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def api_can_get_error(self):
        data = {
            'username': 'foo',
            'password': 'bar'
        }
        response = self.api_client.post(
            reverse('tasks:get_auth_token'),
            data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


