const passwordInput = document.getElementById("passwordInput");
            const unlockButton = document.getElementById("unlockButton");

            passwordInput.addEventListener("input", function() {
              const password = passwordInput.value;

              if (password === "24864028") {  // 檢查密碼是否等於 "24864028"
                unlockButton.disabled = false;
              } else {
                unlockButton.disabled = true;
              }
            });