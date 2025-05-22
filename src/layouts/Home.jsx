
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
    return (
        <div className="app-layout">
            <Header />
            
            <main className="main-content">
                <Main />
            </main>
            
        </div>
    );
}

export default Home;