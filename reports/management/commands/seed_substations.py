import random
from typing import Any

from django.core.management.base import BaseCommand, CommandParser
from django.core.management.color import no_style
from django.db import connection, transaction

from reports.models import Substation


class Command(BaseCommand):
    help = 'Пересоздаёт ТП (ТП-1 ... ТП-N). Часть ТП получает суффикс "П"'

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "--count", type=int, default=300, help="Количество ТП для создания"
        )
        parser.add_argument(
            "--percent", type=int, default=20, help='Процент ТП с суффиксом "П"'
        )

    def handle(self, *args: Any, **options: Any) -> None:
        count: int = options["count"]
        percent: int = options["percent"]

        # Удаляем старые записи и сбрасываем sequence/auto-increment к 1
        table = Substation._meta.db_table  # ty: ignore[unresolved-attribute]

        sql_list = connection.ops.sql_flush(
                no_style(), [table], reset_sequences=True
            )

        with connection.cursor() as cursor:
            for sql in sql_list:
                cursor.execute(sql)

        self.stdout.write(
            self.style.WARNING(f"Таблица {table} очищена, ID сброшен к 1")
        )

        # Выбираем случайные номера, которые получат суффикс "П"
        suffix_count = round(count * percent / 100)
        suffix_ids = set(random.sample(range(1, count + 1), suffix_count))

        with transaction.atomic():
            substations = [
                Substation(name=f"ТП-{i}П" if i in suffix_ids else f"ТП-{i}")
                for i in range(1, count + 1)
            ]

            Substation.objects.bulk_create(substations)  # ty: ignore[unresolved-attribute]

            self.stdout.write(
                self.style.SUCCESS(
                    f'Создано {count} ТП, из них {suffix_count} с суффиксом "П"'
                )
            )
