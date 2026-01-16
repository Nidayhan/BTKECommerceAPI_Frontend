function LoginPage(){
    return(
        <div>
      <h1>Login</h1>

      <form>
        <div>
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email giriniz"
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Şifre</label><br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Şifre giriniz"
          />
        </div>

        <br />

        <button type="submit">Giriş Yap</button>
      </form>
    </div>
    )
}

export default LoginPage;