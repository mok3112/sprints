from django.db import models

# Create your models here.


class Task(models.Model):
    """
    Model for a Task object, the basis of the productivity method.
    """
    name = models.CharField(max_length=200, help_text='Name of the task')
    time = models.IntegerField(help_text='Time in minutes for the task')
    completed = False

    def __str__(self):
        return str(self.name)
