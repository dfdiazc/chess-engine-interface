# Generated by Django 4.1.1 on 2022-11-15 02:52

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_match_blacks_player_alter_match_end_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='moves',
            name='order',
        ),
        migrations.AddField(
            model_name='moves',
            name='move',
            field=models.CharField(default='e2e4', max_length=10),
        ),
        migrations.AddField(
            model_name='moves',
            name='time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
