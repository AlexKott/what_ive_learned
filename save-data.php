<?php

  $data = json_decode($_POST['data']);
  $fileName = $_POST['filename'] . '.json';

  $fp = fopen($fileName, w);
  fwrite($fp, json_encode($data));
  fclose($fp);

?>
