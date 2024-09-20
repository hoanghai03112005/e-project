import { useParams } from "react-router-dom";
import Search2 from "./search2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Search1() {
    const { name } = useParams();
    const [cats, setCats] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openCategory, setOpenCategory] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const categoriesRes = await fetch('http://localhost:3001/categories');
        const categoriesData = await categoriesRes.json();

        const transformedCategories = Object.keys(categoriesData).map(categoryKey => ({
            name: categoryKey,
            products: categoriesData[categoryKey]
        }));
        setCats(transformedCategories);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryClick = (category) => {
        if (category === "All") {
            setSelectedCategory("All");
            const searchKeyword = localStorage.getItem('searchKeyword') || '';
            navigate(`/search?query=${encodeURIComponent(searchKeyword)}`);
        } else {
            setOpenCategory(openCategory === category ? null : category);
            setSelectedCategory("All");
        }
    };

    const handleSubCategoryClick = (subCategoryId) => {
        const searchKeyword = localStorage.getItem('searchKeyword') || '';
        navigate(`/search?query=${encodeURIComponent(searchKeyword)}&category=${subCategoryId}`);
    };

    return (
        <>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-6"></div>
                                <div className="col-xl-3"></div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div onClick={() => handleCategoryClick("All")} className="d-flex justify-content-between fruite-name">
                                                            <a href="#"><i className="fas fa-apple-alt me-2"></i>All</a>
                                                        </div>
                                                    </li>
                                                    {cats.map((item, index) => (
                                                        <li key={index}>
                                                            <div className="d-flex justify-content-between fruite-name" onClick={() => handleCategoryClick(item.name)}>
                                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>{item.name}</a>
                                                            </div>
                                                            {openCategory === item.name && (
                                                                <ul className="list-unstyled ps-4">
                                                                    {item.products.map(product => (
                                                                        <li key={product.id}>
                                                                            <a href="#" onClick={() => handleSubCategoryClick(product.id)}>{product.name}</a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">
                                        <Search2 name={name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
