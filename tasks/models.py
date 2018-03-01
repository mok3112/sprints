from django.db import models

# Create your models here.


class Task(models.Model):
    """
    Model for a Task object, the basis of the productivity method.
    """
    name = models.CharField(max_length=200, help_text='Name of the task')
    time = models.IntegerField(help_text='Time in minutes for the task')
    completed = models.BooleanField(help_text='Is the task completed?', default=False)

    def __str__(self):
        return str(self.name)


class GlobalSettings(models.Model):
    """
    Model containing all global settings for the application.
    Since we only have one user right now, we restrict this to being instantiated once only.
    """
    name = models.CharField(help_text='Nickname for this set of settings', max_length=200)
    point_hour_ratio = models.DecimalField(help_text='Number of points earned by one hour of work', default=2,
                                           decimal_places=2, max_digits=6)
    daily_high_score = models.DecimalField(help_text='Most points accumulated in a day', default=0,
                                           decimal_places=2, max_digits=6)
    total_points = models.DecimalField(help_text='Total points accumulated', default=0,
                                       decimal_places=2, max_digits=6)

    def __str__(self):
        return str(self.name)
