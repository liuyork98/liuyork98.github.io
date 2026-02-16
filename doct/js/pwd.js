const passwordInput = document.getElementById("passwordInput");
            const unlockButton = document.getElementById("unlockButton");

            passwordInput.addEventListener("input", function() {
              const password = passwordInput.value;

              if (password === "0325") {  // 檢查密碼是否等於 "0325"
                unlockButton.disabled = false;
              } else {
                unlockButton.disabled = true;
              }
            });
