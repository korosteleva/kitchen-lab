<?php

$emailText =
	'Поступила новая заявка.' . PHP_EOL . PHP_EOL .
	'Стиль кухни: ' . $_POST['kitchen-style'] . PHP_EOL .
	'Форма кухни: ' . $_POST['kitchen-form'] . PHP_EOL .
	'Время выполнения: ' . $_POST['kitchen-time'] . PHP_EOL .
	'Как предоставить документы: ' . $_POST['kitchen-docs'] . PHP_EOL .
	'Телефон: ' . $_POST['phone'] . PHP_EOL .
	'Имя: ' . $_POST['name'] . PHP_EOL .
	'Email: ' . $_POST['email'] . PHP_EOL;

$emails = array(
	'korosteleva.tatiana92@gmail.com',
	'123@redfor.ru',
	'andrey_a@redfor.ru'
);

foreach ($emails as $email) {
	mail($email, 'Kitchen Lab', $emailText);
}

