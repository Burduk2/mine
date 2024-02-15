<?php
  require_once './inc/config.inc.php';
  session_start();
  // $crr_time = time();
  // $sql = "DELETE FROM temp_verf WHERE expires > ?";
  // $stmt = $conn->prepare($sql);
  // $stmt->bind_param("i", $crr_time);
  // $stmt->execute();
  // $stmt->close();
  // $conn->close();

  $pageTitle = ucfirst($_GET['f']);
  $form = $_GET['f'];
  if (!isset($_GET['f'])) {
    $pageTitle = 'Login';
    $form = 'login';
  } else if ($_GET['f'] === 'signup') {
    $pageTitle = 'Sign Up';
  }
  if (isset($_GET['e']) && $_GET['f'] === 'signup') {
    $e = $_GET['e'];
    if ($e === 'uidExists') {
      $err = 'This username is already taken. Please choose another one.';
    } else if ($e === 'emailExists') {
      $err = 'This email is already registered.';
    } else if ($e === 'wrongEmail') {
      $err = 'Make sure you\'ve typed the email correctly.';
    } else if ($e === 'pwd') {
      $err = 'Please choose a password at least 8 charachters long.';
    } else if ($e === 'codeExpired') {
      $err = 'The verification link has expired.';
    } else if ($e === 'mailNotSent') {
      $err = 'The email wasn\'t sent. Please try again.';
    } else if ($e === 'badUid') {
      $err = 'You can use only latin letters, numbers, underscores and dashes in your username';
    } else if ($e === 'verify') {
      $vemail = $_GET['vemail'];
      $greenE = 'green';
      $err = "We've sent a link to $vemail. Please click on it to verify your account.";
    }
  } else if (isset($_GET['e']) && $_GET['f'] === 'login') {
    $e = $_GET['e'];
    if ($e === 'uid') {
      $err = 'Username was not found. Try again or sign up to create an account.';
    } else if ($e === 'email') {
      $err = 'Email was not found. Try again or sign up to create an account.';
    } else if ($e === 'pwd') {
      $err = 'The password is incorrect. Try again or 
        <a href="https://bank.impreent.com/forgot-password">forgot password?</a>';
    } else if ($e = 'pwd-changed') {
      $greenE = 'green';
      $err = "Your password was updated succesfully!";  
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
  if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $emailValue = "value='$email'";
  } else {
    $emailValue = '';
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title><?php echo $pageTitle ?> | Impreent Community Bank</title>
  <link rel="stylesheet" href="static/index.css?v=<?php echo time() ?>">
  <link rel="stylesheet" href="static/auth.css?v=<?php echo time() ?>">

  <script src="./static/auth.js?v=<?php echo time() ?>" defer></script>
</head>
<body>
  <nav>
    <a class="logo" href="<?php echo$HOME_URL?>">
    <img src="favicon.ico" alt="Impreent Logo" draggable="false"><span>Bank</span></a>
  </nav>

  <form action="inc/<?php echo $form ?>.inc.php" method="post" class="auth-form">
    <h1 class="title"><?php echo $pageTitle ?></h1>
    <?php if ($form === 'signup'): ?>
      <label for="auth-email-inp">Email</label>
      <input type="text" placeholder="Enter your email..." maxlength="128" id="auth-email-inp" name="email" 
        <?php echo $emailValue; ?> required>
    <?php endif; ?>
    <label for="auth-uid-inp">username <?php if ($form === 'login')echo 'or email';?></label>
    <input type="text" placeholder="Enter your username<?php if ($form === 'login')echo ' or email';?>..."
      maxlength="128" id="auth-uid-inp" <?php echo $uidValue; ?> name="uid" required>
    <label for="auth-pwd-inp">password</label>
    <input type="password" placeholder="Enter your password..." id="auth-pwd-inp" name="pwd" required>
    <div class="show-pwd-wrapper">
      <a></a>
      <label>Show password</label>
    </div>

    <button type="submit" name="<?php echo$form ?>"><?php echo$pageTitle ?></button>
    <?php if(isset($_GET['e'])) echo "<p class='err $greenE'>".$err.'</p>'; ?>

    <?php if ($form === 'login'): ?>
      <p class="switch">Don't have an account yet? <a href="https://bank.impreent.com/auth?f=signup">Sign Up</a></p>
      <p class="switch" style="margin-top: .5em"><a href="https://bank.impreent.com/forgot-password">Forgot password?</a></p>
    <?php else: ?>
      <p class="switch">Already have an account? <a href="https://bank.impreent.com/auth?f=login">Log In</a></p>
    <?php endif; ?>
  </form>
  <a class="return-home" href="https://bank.impreent.com">Return to Home Page</a>
</body>
</html>