import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.homePage}>
      <h1>Welcome to the Contact Book Application</h1>
      <p>This is a simple application to manage your contacts.</p>
      <p>Use the navigation bar to register, login, or view your contacts.</p>
    </div>
  );
};

export default HomePage;
