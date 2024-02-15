<nav>
  <a href="<?php echo $HOME_URL ?>" class="logo">What<span>if</span></a>
  <div class="right">
    <div class="menu-btn">
      <p class="title">Whatif's</p>
      <div class="popup">
        <a href="<?php echo $LEGO_URL ?>">A lego tower</a>
        <a href="<?php echo $LOTTERY_URL ?>">Lottery tickets</a>
        <a href="<?php echo $BITCOIN_URL ?>">Bitcoin</a>
      </div>
    </div>
    <div class="menu-btn">
      <p class="title">Vault</p>
      <div class="popup">
        <a class="balance">Balance: <span>$<?php echo $moneyAmtOut ?></span></a>
        <a href="<?php echo $DONATIONS_URL ?>">Recent donations</a>
        <a m-touch="donate">Donate</a>
      </div>
    </div>
    <a class="theme" onclick="toggleTheme(this)"><i class="fas fa-sun"></i></a>
  </div>
</nav>
<?php include_once 'modal.donate.php' ?>
<section class="s-checkout whatif-vault-display" style="margin-top: 5em">
  <div class="stats">
    <h1 style="font-size: 2em">A total of <span>$<?php echo $moneyAmtOut ?></span> is inside the Vault</h1>
    <p>Special thanks to every contributor!</p>
    <a m-touch="donate">Donate</a>
  </div>
</section>