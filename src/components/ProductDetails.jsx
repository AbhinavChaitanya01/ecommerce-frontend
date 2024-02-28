import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogContext from '../contexts/logContext';

export const ProductDetails = () => {
    const navigate = useNavigate();
    
    const { log, email } = useContext(LogContext);
    const url = "https://e-commerce-cyan-nine.vercel.app/api";
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState({
        productName: "",
        price: 0,
        description: "",
        productImg: []
    });
    const [comments, setComments] = useState([]);
    const [ourReview, setOurReview] = useState();
    const [writeComment, setWriteComments] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const quantityRef = useRef(1);
    const commentTextRef = useRef("");
    const commentImagesRef = useRef([]);

    const fetchProductDetailsandComments = async () => {
        try {
            const productResponse = await fetch(`${url}/products/getProduct/${productId}`, { method: "GET" });
            const productJson = await productResponse.json();
            if (productJson.status) {
                setProductDetail(productJson.message);
            } else {
                console.error("Error fetching product details:", productJson.message);
            }

            const commentResponse = await fetch(`${url}/comments/getComment/${productId}`, { method: "GET" });
            const commentJson = await commentResponse.json();
            if (commentJson.status) {
                console.log(commentJson.message)
                setComments(commentJson.message);
            } else {
                console.error("Error fetching comments:", commentJson.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchProductDetailsandComments();
            const userReview = comments.find(comment => comment.commentBy.email === email);
            setOurReview(userReview || null);
        };
        fetchData();
    }, [productId, email]);

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % productDetail.productImg.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + productDetail.productImg.length) % productDetail.productImg.length);
    };

    const handleQuantityChange = (value) => {
        quantityRef.current = Math.max(quantityRef.current + value, 1);
        document.getElementById('quantityInput').value = quantityRef.current;
    };

    const handleAddComment = () => {
        if (!log) {
            navigate('/login');
        } else {
            setWriteComments(!writeComment);
        }
    };

    const handleCommentText = (e) => { 
        commentTextRef.current = e.target.value;
    };

    const handleCommentImages = (e) => { 
        commentImagesRef.current = e.target.files;
    };
    
    const handleSubmitComment = async () => {
        try {
            const formData = new FormData();
            formData.append("text", commentTextRef.current);
            if (commentImagesRef.current) {
                for (let i = 0; i < commentImagesRef.current.length; i++) {
                    formData.append("commentImg", commentImagesRef.current[i]);
                }
            }
    
            const response = await fetch(
                `${url}/comments/addComment/${productId}`,
                {
                    method: "POST",
                    headers: {
                        "Token": localStorage.getItem('Token'),
                    },
                    body: formData
                }
            );
            const json = await response.json();
            console.log(json.message)
            if (json.status) {
                const commentResponse = await fetch(`${url}/comments/getComment/${productId}`, { method: "GET" });
                const commentJson = await commentResponse.json();
                console.log(commentJson.message)

                if (commentJson.status) {
                    setComments(commentJson.message);
                    const userReview = comments.find(comment => comment.commentBy.email === email);
                    setOurReview(userReview || null);
                } else {

                    console.error("Error fetching comments:", commentJson.message);
                }
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };


    return (
        <>
            <div className='container m-auto row my-4'>
                <div className='col'>
                    <div className='d-flex align-items-center justify-content-center' style={{ height: "70vh" }}>
                        {productDetail.productImg && productDetail.productImg.map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`} style={{ display: index === currentImageIndex ? 'block' : 'none' }} className='w-100' />
                        ))}
                    </div>
                    <div>
                        <button className='btn btn-light p-2 w-50' onClick={prevImage}>{"<"}</button>
                        <button className='btn btn-light p-2 w-50' onClick={nextImage}>{">"}</button>
                    </div>
                </div>
                <div className='col'>
                    <div className="row overflow-auto" style={{ maxHeight: "60vh" }}>
                        <h2 className='text-center'>{productDetail.productName}</h2>
                        <p><span className='fs-4' style={{ fontWeight: 'bolder' }}>Price:</span> {productDetail.price} </p>
                        <p><span className='fs-4' style={{ fontWeight: 'bolder' }}>Description:</span> {productDetail.description} </p>
                    </div>
                    <div style={{ maxHeight: "10vh" }}>
                        <div className='row my-2'>
                            <div className='col my-2 text-center'>
                                <button className='btn' onClick={() => handleQuantityChange(-1)}>{"-"}</button>
                                <input id="quantityInput" className='form-control w-50 d-inline' defaultValue={1}></input>
                                <button className='btn' onClick={() => handleQuantityChange(1)}>{"+"}</button>
                            </div>
                        </div>
                        <button className='btn btn-dark mx-1'> Add to Cart</button>
                        <button className='btn btn-secondary mx-1'>Buy Now</button>
                    </div>
                </div>
            </div>


            <div className='container m-auto p-2 border border-dark rounded'>
                <p className='fs-3 text-center text-decoration-underline'>REVIEWS</p>
                {!ourReview || ourReview.length<1 ? (
                    <>
                        <button className='btn btn-light' onClick={handleAddComment}>Write a Product Review</button>
                        {writeComment && <form className='m-2 border border-dark p-4 rounded'>
                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <input type="text" className="form-control m-2" id="text" name="text" placeholder="Enter whatever you feel about product" onChange={handleCommentText} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="commentImg">Comment Images</label>
                                <input type="file" className="form-control" id="commentImg" name="commentImg" multiple onChange={handleCommentImages} />
                            </div>
                            <button type="button" className="btn btn-primary mt-2" onClick={handleSubmitComment}>Submit</button>
                        </form>}
                    </>
                ) : (
                    <>
                        <h5> My Review</h5>
                        <div className="card w-100 mb-5">
                            <h5 className="card-header">{ourReview.text}</h5>
                            <div className="card-body">
                                <h6 className="card-title"><span style={{ fontWeight: 'bolder' }}>Posted By:-</span> {ourReview.commentBy.buyerName}</h6>
                                <h6 className="card-title"><span style={{ fontWeight: 'bolder' }}>Posted On:-</span> {ourReview.dateOfPosting}</h6>
                                {ourReview.commentImg.map((img, idx) => (
                                    <img key={idx} className='border border-dark rounded m-1' height={150} width={150} src={img} alt={`Comment Image ${idx + 1}`} />
                                    ))}
                                <br></br>
                            </div>
                        </div>
                    </>
                )}


                {Array.isArray(comments) && comments.length > 0 && comments.filter(comment => !ourReview || comment._id !== ourReview._id).map((comment, index) => (
                    <div className="card w-100 my-2" key={index}>
                        <h5 className="card-header">{comment.text}</h5>
                        <div className="card-body">
                            <h6 className="card-title"><span style={{ fontWeight: 'bolder' }}>Posted By:-</span> {comment.commentBy.buyerName}</h6>
                            <h6 className="card-title"><span style={{ fontWeight: 'bolder' }}>Posted On:-</span> {comment.dateOfPosting}</h6>
                            {comment.commentImg.map((img, idx) => (
                                <img key={idx} className='border border-dark rounded m-1' height={150} width={150} src={img} alt={`Comment Image ${idx + 1}`} />
                            ))}
                            <br></br>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
