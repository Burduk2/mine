<?php
  require_once './inc/config.inc.php';
  session_start();
  // $crr_time = time();
  // $sql = "DELETE FROM temp_verf WHERE expires >= ?";
  // $stmt = $conn->prepare($sql);
  // $stmt->bind_param("i", $crr_time);
  // $stmt->execute();
  // $stmt->close();
  // $conn->close(); 

  $bankUid = 'bank';
  $getMoneyAmtSql = "SELECT balance FROM users WHERE uid = ?";
  $getMoneyAmtStmt = $conn->prepare($getMoneyAmtSql);
  $getMoneyAmtStmt->bind_param('s' , $bankUid);
  $getMoneyAmtStmt->execute();
  $getMoneyAmtRes = $getMoneyAmtStmt->get_result();
  $getMonetAmtRow = $getMoneyAmtRes->fetch_assoc();
  $moneyAmt = $getMonetAmtRow['balance'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impreent Community Bank</title>

  <link rel="stylesheet" href="static/index.css?v=<?php echo time() ?>">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <script src="static/index.js?v=<?php echo time() ?>" defer></script>
  <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
</head>
<body>
  <script>const moneyAmt = <?php echo $moneyAmt; ?>;</script>

  <nav>
    <a class="logo" href=""><img src="favicon.ico" alt="Impreent Logo" draggable="false"><span>Bank</span></a>
    <div class="right">
      <div class="account">
        <?php if ($_SESSION['uid']): ?>
          <a><?php echo $_SESSION['uid']; ?></a>
        <?php else: ?>
          <a href="auth?f=login">Login</a>
          <a href="auth?f=signup">Sign Up</a>
        <?php endif; ?>
      </div>
    </div>
  </nav>

  <section class="intro">
    <div class="textbox">
      <div class="textbox-content">
        <h1><span>Give</span> & <span>Take</span></h1>
        <p>
          With Impreent's Community Bank, you can contribute to help those 
          in need or freely withdraw from the bank when you require support. 
          It's all about fostering a caring community!
        </p>
      </div>
    </div>
    <div class="img-wrapper">
      <img src="img/community-bank.svg" alt="Community Bank">
    </div>
  </section>

  <section class="benefits">
    open-minded
  </section>

  <div class="money-jar-wrapper">
    <div class="stats">
      <h1 class="total">Together, <span></span> has been gathered</h1>
      <div class="choice-btns">
        <?php if ($_SESSION): ?>
          <button data-ltx="take">Withdraw</button>
        <?php else: ?>
          <button onclick="window.location.href='<?php echo$HOME_URL?>/auth?f=signup'">Withdraw</button>
        <?php endif; ?>
        <div id="paypal-donate-btn-container"></div>
      </div>
    </div>
    <div class="money-jar"></div>
  </div>

  <footer>
    <p class="copy">&copy; 2023 Impreent</p>
    <div class="links">
      <a href="">About</a>
      <a href="">Terms</a>
      <a href="">Privacy</a>
    </div>
  </footer>

  <dialog class="take" open>
    <div class="top-menu">
      <h1>Withdraw</h1>
      <button data-closeltx="take"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="content-wrapper">
      <form action="inc/take.inc.php" method="post">
        <div class="take-options">
          <a data-amt="10" class="chosen">Take $10</a>
          <a data-amt="50">Take $50</a>
          <input type="hidden" value="10" name="amt">
        </div>

        <label for="take-reason-inp">Why do you take?</label><br>
        <textarea name="reason" id="take-reason-inp" rows="5" minlength="100"
          placeholder="Please tell why do you need these money" maxlength="750" required></textarea><br>

        <label class="pm-start">How do you want to recieve payment?</label>
        <div class="pm-wrapper">
          <div class="pm-label-wrapper">
            <div class="radio"></div>
            <label for="pm-card-inp" class="pm-label">With card</label>
          </div>
          <input class="pm-inp" type="text" name="pm" placeholder="1000 2000 3000 4000" maxlength="19" required 
            id="pm-card-inp" disabled="true">
        </div>
        
        <div class="pm-wrapper">
          <div class="pm-label-wrapper">
            <div class="radio"></div>
            <label for="pm-paypal-inp" class="pm-label">With PayPal</label>
          </div>  
          <input class="pm-inp" type="text" name="pm" placeholder="example@gmail.com" required disabled="true"
            id="pm-paypal-inp">
        </div>
        
        <button type="submit" name="take" class="submit">Send</button>
      </form>
    </div>
  </dialog>
  <dialog class="donate">
    <div class="top-menu">
      <h1>Contribute</h1>
      <button data-closeltx="donate"><i class="fas fa-xmark"></i></button>
    </div>
    <div class="content-wrapper">
      <form action="" method="post">
        <label for="donation-amt-inp">Enter donation amount</label><br>
        <input type="text" name="amt" placeholder="Enter donation amount..." id="donation-amt-inp" 
          maxlength="12" required>

        <div class="donate-options">
          <a>5</a> <a>25</a> <a>50</a> <a>100</a> <a>500,000</a>
        </div>

        <label for="take-reason">Add comment (optional)</label><br>
        <textarea name="reason" id="take-reason" rows="5" maxlength="500"
          placeholder="Leave some message to people :)"></textarea><br>

        <button type="submit" class="submit">Submit</button>
      </form>
    </div>
  </dialog>

  <script>
        PayPal.Donation.Button({
            env:'sandbox',
            hosted_button_id:'PEJ2LBLBKGL76',
            image: {
              src:'img/donate-btn.png',
              alt:'Donate with PayPal button',
              title:'PayPal - The safer, easier way to pay online!',
            }
        }).render('#paypal-donate-btn-container');

        let btn = document.querySelector('#paypal-donate-btn-container img');
        btn.style.filter = 'brightness(1.3)';
        btn.style.transition = '100ms';
        btn.style.margin = '9.6px 4px 0 4px';
        btn.style.width = '168px';
        // btn.style.height = '38.71px';
   </script>
</body>
</html>