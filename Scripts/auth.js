class server {
  BACKEND_URL = 'https://rulers-sh.com';

  checkAuth = async () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.BACKEND_URL}/api/user/checkauth`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  renderUserGems = async userGemsDOMEl => {
    this.checkAuth().then(res => {
      if (res.isLoggedIn) {
        userGemsDOMEl.textContent = res.userData.gems;
      }
    });
  };

  async checkIfEnoughGems(price) {
    const res = await this.checkAuth();
    if (res.isLoggedIn && res.userData.gems >= price) {
      return true;
    } else {
      return false;
    }
  }

  renderUserState = (logSignHeaderBtns, accItems, accGemsAmountEl) => {
    this.checkAuth().then(res => {
      if (res.isLoggedIn) {
        logSignHeaderBtns.forEach(btn => {
          btn.style.display = 'none';
        });
        accItems.forEach(item => {
          item.style.display = 'block';
        });
        accGemsAmountEl.style.display = 'block';
      }
    });
  };
}

export default server;
