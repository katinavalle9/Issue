import { useState, useEffect } from "react";
import "../css/style.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [repoTitle,setRepoTitle] = useState("")

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/issues")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handlerepoTitle=(e)=>{
    setRepoTitle(e.target.value);
  }

  const filteredTitle = items.filter(repo =>repo.
    title.toLowerCase().includes(repoTitle.toLowerCase()));

  const openRepositoryUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
    <div className="container">
    <form className='form-inline my-2 my-lg-0 w-75 '>
          <input type='text' 
          className='form-control' 
          id='search' 
          placeholder='Search title...' 
           value={repoTitle} 
           onChange={handlerepoTitle} 
          />
        </form>

    <div className="row">
      {filteredTitle.map((item) => (
        <div key={item.id} className="col-sm-6 mb-4 mt-4 ">
          <ol className="list-group list-group-numbered ">
            <li className="list-group-item ">ID: {item.id}</li>
            <button className="list-group-item " onClick={() => openRepositoryUrl(item.html_url)}>
            Title: {item.title}
            </button>
            <li className="list-group-item ">User: {item.user.login}</li>
            {/* Agrega más detalles según sea necesario */}
          </ol>
        </div>
      ))}
    </div>
    </div>
        

    </>
   
  );
};

export default Home;
