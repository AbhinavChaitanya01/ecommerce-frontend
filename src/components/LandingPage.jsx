import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const url = "https://e-commerce-cyan-nine.vercel.app/api";

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const response = await fetch(`${url}/products/getProducts`, {
          method: "GET",
        });
        const json = await response.json();
        setProducts(json.message);
        console.log(json.message);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    FetchProducts();
  }, []);

  const [activeIndexes, setActiveIndexes] = useState({});
  useEffect(() => {
    setActiveIndexes(new Array(products.length).fill(0));
  }, [products]);

  const handleNextClick = (idx, totalImages) => {
    setActiveIndexes(prevState => {
      const newState = [...prevState];
      newState[idx] = (newState[idx] + 1) % totalImages;
      return newState;
    });
  };

  const handlePrevClick = (idx, totalImages) => {
    setActiveIndexes(prevState => {
      const newState = [...prevState];
      newState[idx] = (newState[idx] - 1 + totalImages) % totalImages;
      return newState;
    });
  };

  return (
    <>
      <div className="row m-4">
        {products.length > 0 &&
          products.map((element, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <div
                    id={`carousel-${idx}`}
                    className="carousel slide"
                    data-ride="carousel"
                    style={{ width: '100%', height: '200px', textAlign: "center" }}
                  >
                    <div className="carousel-inner">
                      {element.productImg.map((image, index) => (
                        <div
                          className={`carousel-item ${index === (activeIndexes[idx]) ? 'active' : ''}`}
                          key={`${idx}-image-${index}`}
                          style={{ overflow: "hidden", textAlign: 'center', height: '200px' }}
                        >
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ objectFit: 'contain', height: '100%' }}
                          />
                        </div>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href={`#carousel-${idx}`}
                      role="button"
                      data-slide="prev"
                      onClick={() => handlePrevClick(idx, element.productImg.length)}
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href={`#carousel-${idx}`}
                      role="button"
                      data-slide="next"
                      onClick={() => handleNextClick(idx, element.productImg.length)}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <h5 className="card-title fw-bolder">{element.productName}</h5>
                  <h5 className="card-title fw-bolder">Rs{element.price}/-</h5>
                  <p className="card-text fw-medium">{element.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default LandingPage;
