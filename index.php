<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Noughts and Nots</title>

<link rel="stylesheet" href="style.css" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="script.js"></script>

</head>

<body>

<div id="board">
	<?php for ($i = 0; $i < 9; $i++) : ?>
	<div class="subBoard board<?=$i?> currentBoard" data-space="<?=$i?>">
		<div class="boardOutline">
			<?php for ($j = 0; $j < 9; $j++) : ?>
			<div class="subBoardSpace subBoard<?=$i?>" data-space="<?=$j?>"></div>
			<?php endfor; ?>
		</div>
	</div>
	<?php endfor; ?>
</div>

<div class="reset"></div>

</body>

</html>