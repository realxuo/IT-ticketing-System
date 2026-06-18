// Auth View
function renderAuthView() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          ${logoSVG(36)}
          <div>
            <div class="logo-text">HelpDesk</div>
            <div class="logo-sub">IT Support Portal</div>
          </div>
        </div>
        <div class="auth-title">Sign in to your account</div>
        <div class="auth-subtitle">Contact your admin if you need access.</div>
        <div id="auth-error" class="auth-error" style="display:none"></div>
        <form id="login-form">
          <div class="form-group">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" id="login-email" placeholder="you@company.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" id="login-password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width:100%" id="login-btn">
            Sign In
          </button>
        </form>
        <div class="auth-demo">
          <div class="auth-demo-title">Demo Accounts</div>
          <div class="auth-demo-item">Admin: <strong>admin@helpdesk.com</strong> / <strong>admin123</strong></div>
          <div class="auth-demo-item">Technician: <strong>alex@helpdesk.com</strong> / <strong>tech123</strong></div>
          <div class="auth-demo-item">User: <strong>sam@company.com</strong> / <strong>user123</strong></div>
        </div>
      </div>
    </div>`;
}

function initAuthView(onLogin) {
  const errBox = document.getElementById('auth-error');
  function showErr(msg) { errBox.textContent = msg; errBox.style.display = 'block'; }
  function hideErr() { errBox.style.display = 'none'; }

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); hideErr();
    const btn = document.getElementById('login-btn');
    btn.textContent = 'Signing in…'; btn.disabled = true;
    try {
      const user = await API.login(
        document.getElementById('login-email').value,
        document.getElementById('login-password').value
      );
      onLogin(user);
    } catch (err) {
      showErr(err.message);
      btn.textContent = 'Sign In'; btn.disabled = false;
    }
  });
}