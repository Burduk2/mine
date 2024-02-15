<?php
  require_once './inc/config.inc.php';
  $getLotteryBalSql = "SELECT lottery_balance FROM vault";
  $getLotteryBalStmt = $conn->prepare($getLotteryBalSql);
  $getLotteryBalStmt->execute();
  $getLotteryBalRes = $getLotteryBalStmt->get_result();
  $getLotteryBalRow = $getLotteryBalRes->fetch_assoc();
  $lotteryBal = $getLotteryBalRow['lottery_balance'];
  $getLotteryBalStmt->close();

  $getItemsSql = "SELECT COUNT(*) AS item_count FROM vault_notf";
  $getItemsStmt = $conn->prepare($getItemsSql);
  $getItemsStmt->execute();
  $getItemsStmt->bind_result($itemCount);
  $getItemsStmt->fetch();
  $tries = $itemCount;
  $getItemsStmt->close();
  $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once 'components/head.php' ?>
    <title>Lottery | Whatif</title>
    
    <style>
      .main-img {
        padding: 0 1em;
        width: 600px;
        max-width: 100%;
        margin: auto;
        display: block;
      }
    </style>
</head>
<body>
  <?php include_once 'components/nav.php' ?>
  <section class="s-checkout">
    <div class="stats">
      <h1>A total of 
        <?php if ($lotteryBal < 0): ?>
          <span>$<?php echo $lotteryBal * -1 ?></span> is lost in a lottery
        <?php else: ?>
          <span>$<?php echo $lotteryBal ?></span> is... won in a lottery!
        <?php endif; ?>
      </h1>
      <p style="font-style: normal; color: var(--secondaryColor)">
        Total tries: <?php echo $tries ?>. The chance of winning in our lottery is close 
        to the chance of real lotteries: 0.0000000007%. That's 9 zeroes!
      </p>
    </div>
  </section>
  <img class="main-img" src="./img/whatifs/lottery-money.png" alt="Lost money in lottery. What if buy lottery tickets for all money?">
  <?php include_once 'components/footer.php' ?>
</body>
</html>