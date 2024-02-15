<?php
  require_once './inc/config.inc.php';
  
  if (isset($_GET['e'])) {
    $e = $_GET['e'];
    if ($e === 'uid') {
      $err = 'Username was not found. Please try again.';
    } else if ($e === 'email') {
      $err = 'Email was not found. Please try again';
    } else if ($e === 'pwd') {
      $err = 'Password should be at least 8 charachters long.';
    } else if ($e === 'mailNotSent') {
      $err = 'The email wasn\'t sent. Please try again.';
    } else if ($e === 'codeExpired') {
      $err = 'The confirmation link has expired.';
    } else if ($e === 'verify') {
      $vemail = $_GET['vemail'];
      $greenE = 'green';
      $err = "We've sent a link to $vemail. Please click on it to verify your account.";
    }
  } else {
    $err = '';
  }

  if (isset($_GET['uid'])) {
    $uid = $_GET['uid'];
    $uidValue = "value='$uid'";
  } else {
    $uidValue = '';
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restore Password | Impreent Community Bank</title>
  <link rel="stylesheet" href="static/auth.css?v=<?php echo time()?>">
  <link rel="stylesheet" href="static/index.css">

  <script src="static/auth.js" defer></script>
</head>
<body>
  <nav>
     <a class="logo" href="<?php echo$HOME_URL?>">
     <img src="favicon.ico" alt="Impreent Logo" draggable="false"><span>Bank</span></a>
  </nav>
  <form action="inc/forgot-pwd.inc.php" class="auth-form" method="post">
    <h1 class="title">Restore Password</h1>
    <label for="uid-inp">your username or email</label>
    <input type="text" id="uid-inp" placeholder="Enter your username or email..." maxlength="128" name="uid" 
      <?php echo $uidValue; ?> required>
    <label for="auth-pwd-inp">choose a new password</label>
    <input type="password" placeholder="Enter new password..." id="auth-pwd-inp" name="pwd" autocomplete="off" required>
    <div class="show-pwd-wrapper">
      <a></a>
      <label>Show password</label>
    </div>

    <button type="submit" name="forgot-pwd">Change my password</button>
    <?php if(isset($_GET['e'])) echo "<p class='err $greenE'>".$err.'</p>'; ?>
  </form>
  <a class="return-home" href="https://bank.impreent.com">Return to Home Page</a>
</body>
</html>