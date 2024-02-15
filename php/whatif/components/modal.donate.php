<div m-name="donate" class="modal-donate">
    <h2>A PayPal Donation window will be opened</h2>
    <div class="choice-btns">
        <div class="wrapper">
            <button m-touch="donate">Close</button>
        </div>
        <div id="paypal-donate-button-container" class="wrapper">
        </div>
    </div>
</div>
<script>
    PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: 'RUB3SKT7AJQA2',
        business: 'artem.ustimenko2008@gmail.com',
        image: {
            src: '<?php echo "$HOME_URL/img/donate-btn.svg" ?>',
            title: 'PayPal - The safer, easier way to pay online!',
            alt: 'Donate with PayPal button'
        },
        onComplete: function (params) {
            var jsonString = JSON.stringify(params);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '<?php echo $HOME_URL ?>/inc/processDonation.inc.php', true);
            xhr.setRequestHeader('Content-Type', 'application/json'); 
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    console.log(jsonResponse);
                }
            };
            xhr.send(jsonString);
        },
    }).render('#paypal-donate-button-container');
</script>