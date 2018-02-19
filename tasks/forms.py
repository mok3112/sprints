from django import forms


class EnterTaskForm(forms.Form):
    task_name = forms.CharField(help_text="Enter the name of the task")
    time = forms.IntegerField(help_text="Enter the time in minutes")

    def clean_task_name(self):
        data = self.cleaned_data['task_name']
        return data.strip()

    def clean_time(self):
        time = self.cleaned_data['time']
        return int(time)