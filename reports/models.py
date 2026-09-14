from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Substation(TimeStampedModel):
    name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name

