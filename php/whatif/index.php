<?php
  require_once './inc/config.inc.php';

  $getLotteryBalSql = "SELECT * FROM vault";
  $getLotteryBalStmt = $conn->prepare($getLotteryBalSql);
  $getLotteryBalStmt->execute();
  $getLotteryBalRes = $getLotteryBalStmt->get_result();
  $getLotteryBalRow = $getLotteryBalRes->fetch_assoc();
  $lotteryBal = $getLotteryBalRow['lottery_balance'];
  $lotteryBalOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($lotteryBal, 2));
  if ($lotteryBal < 0) {
    $lotteryBalOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($lotteryBal * -1, 2));
  }
  $btcBal = $getLotteryBalRow['btc_balance'];
  $getLotteryBalStmt->close();

  function getBtcPrice() {
    $url = "https://blockchain.info/ticker";
    $res = file_get_contents($url);
    if ($res === FALSE) {
      return "Error fetching data";
    }
    $data = json_decode($res, true);
    return $data ? $data['USD']['last'] : "Error parsing";
  }

  $btcProfit = number_format($btcBal * getBtcPrice(), 2);
  // $btcProfit = $btcBal * getBtcPrice();
  // $btcProfit = $btcBal * (getBtcPrice() * $moneyAmt);
  $btcProfit = $btcBal * getBtcPrice();
  $btcProfitOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($btcProfit, 2));

  $legoBricksAmt = floor($moneyAmt * 10);
  $legoTowerH = number_format($legoBricksAmt * 0.096, 0);
  $legoBricksAmtOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($legoBricksAmt, 0));
  $legoTowerHOut = str_replace(',', '<span style="padding: .1em"></span>', $legoTowerH);
?>

<!DOCTYPE html>
<html>
<head>
  <?php include_once 'components/head.php' ?>
  <title>Whatif - the weird things money can do</title>
  <style>.whatif-vault-display {display: none}</style>

  <!-- <script src="./static/js/index.js" defer></script> -->
</head>
<body>
  <?php include_once 'components/nav.php' ?>
  <section class="s-intro">
    <div class="part each-dollar">
      <h2 class="what-if">What If...</h2>
      <h1><span>All</span> the money inside <span>the Vault</span> became...</h1>
      <img src="img/money-jar.jpg" alt="MoneyJar. Whatif vault, converting money">
    </div>
    <div class="part part-ex lego-ex">
      <div class="textbox">
        <h1>A tower of lego bricks</h1>
        <p>How high could we go?</p>
        <a href="<?php echo $LEGO_URL ?>">Show me it!</a>
      </div>
      <img src="img/lego-tower.png" alt="10 lego bricks">
    </div>
    <div class="part part-ex lottery-ex">
      <img src="img/lottery.png" alt="lottery">
      <div class="textbox">
        <h1>Lottery tickets</h1>
        <p>How much would we lose?</p>
        <a href="<?php echo $LOTTERY_URL ?>">Let's see!</a>
      </div>
    </div>
    <div class="part part-ex btc-ex">
      <div class="textbox">
        <h1>An investment in Bitcoin</h1>
        <p>Would we lose everything or profit like crazy?</p>
        <a href="<?php echo $BITCOIN_URL ?>"">Check it out</a>
      </div>
      <img src="img/btc.png" alt="btc">
    </div>
  </section>
  <section class="s-checkout">
    <div class="stats">
      <h1>A total of <span>$<?php echo $moneyAmtOut ?></span> is inside the Vault</h1>
      <p>Special thanks to every contributor!</p>
      <a m-touch="donate">Donate</a>
    </div>
    <div class="ex-wrapper" id="whatifs">
      <div class="ex ex1">
        <i class="fa-solid fa-bars-staggered"></i>
        <h1><span><?php echo $legoBricksAmtOut ?></span> lego bricks would form a tower of 
          more than <span><?php echo $legoTowerHOut ?>m</span></h1>
        <a href="<?php echo $LEGO_URL ?>">See more...</a>
      </div>
      <div class="ex ex2">
        <i class="fa-solid fa-ticket"></i>
        <h1>
          <?php if ($lotteryBal < 0): ?>
            <span>$<?php echo $lotteryBalOut ?></span> would be lost in a lottery
          <?php else: ?>
            <span>$<?php echo $lotteryBalOut ?></span> would be... won in a lottery!
          <?php endif; ?>  
        </h1>
        <a href="<?php echo $LOTTERY_URL ?>">See more...</a>
      </div>
      <div class="ex ex3">
        <i class="fa-brands fa-bitcoin"></i>
        <h1><span>$<?php echo $btcBal ?></span> Bitcoin would be earned, which is <span>$<?php echo $btcProfitOut ?></span></h1>
        <a href="<?php echo $BITCOIN_URL ?>"">See more...</a>
      </div>
    </div>
  </section>
  <form action="inc/processDonation.inc.php">
    <button>Submit</button>
  </form>
  <?php include_once 'components/footer.php' ?>
</body>
</html>
