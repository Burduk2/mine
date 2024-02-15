<?php
  require_once './inc/config.inc.php';
  $bricksAmt = floor($moneyAmt * 10);
  $towerH = number_format($bricksAmt * 0.096, 1);
  $bricksAmtOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($bricksAmt, 0));
  $towerHOut = str_replace(',', '<span style="padding: .1em"></span>', $towerH);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once 'components/head.php' ?>
    <title>Lego Tower | Whatif</title>
    <link rel="stylesheet" href="./static/css/lego.css">
    <script src="./static/js/lego.js" defer></script>
</head>
<body>
  <script>const moneyAmt = <?php echo $moneyAmt ?>;</script>
  <?php include_once 'components/nav.php' ?>
  <section class="s-checkout">
    <div class="stats">
      <h1 style="font-size: 4vw">Now <span><?php echo $bricksAmtOut ?></span> lego bricks form a tower of 
        <span><?php echo $towerHOut ?>m</span></h1>
      <p style="font-style: normal; color: var(--secondaryColor)">That's high, isn't it?</p>
    </div>
  </section>
  <div id="lego-tower">
    <div class="measurer"><p><?php echo $towerHOut ?>m</p></div>
    <div class="tower-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" id="lego-bricks-svg"></svg>
      <img src="./img/whatifs/lego-cloud.png" alt="A very high lego tower. What if convert all money to lego bricks? - Whatif">
    </div>
  </div>
  <?php include_once 'components/footer.php' ?>
</body>
</html>