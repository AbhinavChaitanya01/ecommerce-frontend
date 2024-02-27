import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
    const url = "https://e-commerce-cyan-nine.vercel.app/api";
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState({
        productName: "",
        price: 0,
        description: "",
        productImg: []
    });
    const [comments, setComments] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const quantityRef = useRef(1); // Ref for quantity input field

    const fetchProductDetailsandComments = async () => {
        try {
            // Fetch product details
            const productResponse = await fetch(`${url}/products/getProduct/${productId}`, { method: "GET" });
            const productJson = await productResponse.json();
            if (productJson.status) {
                setProductDetail(productJson.message);
            } else {
                console.error("Error fetching product details:", productJson.message);
            }

            // Fetch comments
            const commentResponse = await fetch(`${url}/comments/getComment/${productId}`, { method: "GET" });
            const commentJson = await commentResponse.json();
            if (commentJson.status) {
                setComments(commentJson.message);
            } else {
                console.error("Error fetching details:", commentJson.message);
            }

        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    useEffect(() => {
        fetchProductDetailsandComments();
    }, [productId]);

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % productDetail.productImg.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + productDetail.productImg.length) % productDetail.productImg.length);
    };

    const handleQuantityChange = (value) => {
        // Update the quantity and limit it to a minimum of 1
        quantityRef.current = Math.max(quantityRef.current + value, 1);
        // Update the input field value
        document.getElementById('quantityInput').value = quantityRef.current;
    };

    const addToCart = () => {
        // Add the product to the cart with the current quantity
        // Implement your logic here
    };

    const addComment = () => {
        // Add a comment for the product
        // Implement your logic here
    };

    return (
        <>
            <div className='container m-auto row my-4'>
                {/* Image display */}
                <div className='col'>
                    <div className='d-flex align-items-center justify-content-center' style={{ height: "70vh" }}>
                        {productDetail.productImg && productDetail.productImg.map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} className='w-100' />
                        ))}
                    </div>
                    <div>
                        {/* Buttons to change images */}
                        <button className='btn btn-light p-2 w-50' onClick={prevImage}>{"<"}</button>
                        <button className='btn btn-light p-2 w-50' onClick={nextImage}>{">"}</button>
                    </div>
                </div>
                {/* Product details */}
                <div className='col'>
                    <div className="row overflow-auto" style={{ maxHeight: "60vh" }}>
                        <h2 className='text-center'>{productDetail.productName}</h2>
                        <p><span className='fs-4' style={{ fontWeight: 'bolder' }}>Price:</span> {productDetail.price} </p>
                        <p><span className='fs-4' style={{ fontWeight: 'bolder' }}>Description:</span> {productDetail.description} </p>
                    </div>
                    <div style={{ maxHeight: "10vh" }}>
                        <div className='row my-2'>
                            {/* Quantity control */}
                            <div className='col my-2 text-center'>
                                <button className='btn' onClick={() => handleQuantityChange(-1)}>{"-"}</button>
                                <input id="quantityInput" className='form-control w-50 d-inline' defaultValue={1}></input>
                                <button className='btn' onClick={() => handleQuantityChange(1)}>{"+"}</button>
                            </div>
                        </div>
                        {/* Buttons for adding to cart and buying */}
                        <button className='btn btn-dark mx-1' onClick={addToCart}> Add to Cart</button>
                        <button className='btn btn-secondary mx-1'>Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            {Array.isArray(comments) && comments.length > 0 ? (
                <div className='mx-auto container m-auto mx-5'>
                    <p className='fs-1'>REVIEWS</p>
                    {comments.map((comment, index) => (
                        <div className="card w-100 my-2" key={index}>
                            <h5 className="card-header">{comment.commentBy.buyerName}</h5>
                            <div className="card-body">
                                <h5 className="card-title">{comment.text}</h5>
                                <h6 className="card-title">{comment.dateOfPosting}</h6>
                                {comment.tag.map((t, idx) => (
                                    <span key={idx} className='btn btn-secondary mx-1'>{t}</span>
                                ))}
                                <br></br>
                                {comment.commentImg.map((img, idx) => (
                                    <img key={idx} className='btn' height={100} width={100} src={img} alt={`Comment Image ${idx + 1}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">No reviews available</div>
            )}
        </>
    );
};
