<?php
  require_once './inc/config.inc.php';
  $getNotfSql = "SELECT * FROM vault_notf";
  $getNotfStmt = $conn->prepare($getNotfSql);
  $getNotfStmt->execute();
  $getNotfRes = $getNotfStmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once 'components/head.php' ?>
    <title>Recent Donations | Whatif</title>
    <link rel="stylesheet" href="./static/css/donations.css">
    <script src="./static/js/donations.js" defer></script>
</head>
<body>
  <?php include_once 'components/nav.php' ?>
  <section class="notf-container">
    <?php while ($getNotfRow = $getNotfRes->fetch_assoc()): ?>
      <?php
        $donationAmt = $getNotfRow['donation_amt'];
        $lottery = $getNotfRow['lottery'];
        $btc = $getNotfRow['btc'];
        $date = $getNotfRow['date'];
      ?>
      <div class="notf">
        <div class="top-menu">
          <p class="amt">$<?php echo $donationAmt ?></p>
          <p class="date" data-date="<?php echo $date ?>"></p>
        </div>
        <ul>
          <li>Built <?php echo floor($donationAmt * 10) ?> lego bricks up</li>
          <li>
            <?php echo $lottery < 0 ? 'Lost $' . $lottery * -1 . ' in a lottery' : "Won $$lottery in a lottery!"; ?>
          </li>
          <li>Earned <?php echo $btc ?> Bitcoin</li>
        </ul>
      </div>
    <?php endwhile; ?>
    <?php
      $getNotfStmt->close();
      $conn->close();
    ?>
  </section>
  <?php include_once 'components/footer.php' ?>
</body>
</html>