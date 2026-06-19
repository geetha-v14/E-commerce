import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getSingleProduct,
    getRelatedProducts,
} from "../services/productService";

const useProductDetails = (
    slug
) => {


    //   STATES

    const [product, setProduct] = useState(null);

    const [
        relatedProducts,
        setRelatedProducts,
    ] = useState([]);

    const [loading, setLoading] = useState(true);

    const [
        selectedImage,
        setSelectedImage,
    ] = useState("");

    const [
        openAccordion,
        setOpenAccordion,
    ] = useState("description");


    //   FETCH PRODUCT

    const fetchProduct = useCallback(async () => {

            try {

                setLoading(true);

                const data =
                    await getSingleProduct( slug );

                setProduct(data.product);

                setSelectedImage(
                    data.product.images?.[0]
                        ?.url
                );


                // RELATED PRODUCTS


                const related =
                    await getRelatedProducts(
                        data.product.category
                            ?._id,
                        data.product._id
                    );

                setRelatedProducts(
                    related?.products || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        }, [slug]);


    useEffect(() => {

        fetchProduct();

    }, [fetchProduct]);

    return {

        product,
        relatedProducts,
        loading,

        selectedImage,
        setSelectedImage,

        openAccordion,
        setOpenAccordion,

    };

};

export default useProductDetails;