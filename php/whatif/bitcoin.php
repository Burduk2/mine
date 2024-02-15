<?php
  require_once './inc/config.inc.php';
  
  function getBtcBal($conn) {
    $sql = "SELECT btc_balance FROM vault";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $res = $stmt->get_result();
    $row = $res->fetch_assoc();
    $bal = $row['btc_balance'];
    $stmt->close();
    return $bal;
  }
  
  function getBtcPrice() {
    $url = "https://blockchain.info/ticker";
    $res = file_get_contents($url);
    if ($res === FALSE) {
      return "Error fetching data";
    }
    $data = json_decode($res, true);
    return $data ? $data['USD']['last'] : "Error parsing";
  }
  
  $btcBal = getBtcBal($conn);
  $btcProfit = $btcBal * getBtcPrice();
  $btcProfitOut = str_replace(',', '<span style="padding: .1em"></span>', number_format($btcProfit, 4));
  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <?php include_once 'components/head.php' ?>
  <title>Bitcoin | Whatif</title>
  <style>
    .chart-img {
      padding: 2em 1em;
      width: 600px;
      max-width: 100%;
      animation: btc-show-chart 10s infinite;
      margin: auto;
      display: block;
    }

    @keyframes btc-show-chart {
      0% {
        opacity: 1;
        transform: rotateX(0);
      } 30% {
        opacity: 1;
        transform: rotateX(0);
      } 50% {
        opacity: 0;
        transform: rotateX(70deg);
      } 60% {
        opacity: 0;
        transform: rotateX(70deg);
      } 61% {
        opacity: 0;
        transform: rotateX(0) rotateY(180deg);
      } 75% {
        opacity: 1;
        transform: rotateX(0) rotateY(180deg);
      } 90% {
        opacity: 0;
        transform: rotateX(70deg) rotateY(180deg);
      } 91% {
        opacity: 0;
        transform: rotateX(70deg) rotateY(0);
      } 100% {
        opacity: 1;
        transform: rotateX(0) rotateY(0);
      }
    }
  </style>
</head>
<body>
  <?php include_once 'components/nav.php' ?>
  <section class="s-checkout">
    <div class="stats">
      <h1>
        <span><?php echo $btcBal ?></span> Bitcoin would be earned, 
      </h1>
      <p style="font-style: normal; color: var(--secondaryColor)">
        which is <span>$<?php echo $btcProfitOut ?></span> today! Current BTC price: $<?php echo getBtcPrice() ?>
      </p>
    </div>
  </section>
  <img class="chart-img" src="./img/whatifs/btc-chart.png" alt="Bitcoin chart. Bitcoin growth graph. What if buy bitcoin. Buying bitcoin. Buying Bitcoin for all money. Investing in bitcoin">
  <?php include_once 'components/footer.php' ?>
</body>
</html>