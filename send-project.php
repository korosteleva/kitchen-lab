<?php

$userLinkToProject = '-';


if (!empty($_FILES)) {
	// load file
	$uploadDir = '/kitchen/uploads/';
	$uploaddir = $_SERVER['DOCUMENT_ROOT'] . $uploadDir;

	if (!file_exists($uploaddir)) {
		mkdir($uploaddir, 0777, true);
	}

	$fileInfo = new SplFileInfo($_FILES['project']['name']);
	$fileExt = $fileInfo->getExtension();
	$filename = time() . '_file.' . $fileExt;

	$uploadfile = $uploaddir . $filename;

	if (move_uploaded_file($_FILES['project']['tmp_name'], $uploadfile)) {
		$userLinkToProject = $_SERVER['HTTP_ORIGIN'] . $uploadDir . $filename;
	} else {
		$userLinkToProject = 'Произошла ошибка при загрузке файла. Файл не был загружен';
	}
}


$emailText =
		'Форма обратной связи: проект.' . PHP_EOL . PHP_EOL .
		'Имя: ' . $_POST['name'] . PHP_EOL .
		'Телефон: ' . $_POST['phone'] . PHP_EOL .
		'Email: ' . $_POST['email'] . PHP_EOL .

		'Ссылка на проект: ' . $userLinkToProject;

$emails = array(
	'korosteleva.tatiana92@gmail.com',
	'123@redfor.ru',
	'andrey_a@redfor.ru'
);

foreach ($emails as $email) {
	mail($email, 'Kitchen Lab', $emailText);
}

