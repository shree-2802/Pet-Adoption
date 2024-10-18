import { useEffect, useRef, useState } from 'react';
import ImageSlider, { animalsPropsType } from '../../../components/ImageSlider';
import { availableOptionsType } from '../../../components/description';
import Select from '../../../components/select';
import { availableOptions, breeds, pets } from '../../../constants/data';
import styles from './index.module.scss';
import { emailInvalid, inputErr, submitionSuccess } from '../../../utils/sweetalert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { postPetsdata } from '../../../redux/actions';
import { imageDB } from '../../../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export type postPetPayloadtype = {
    pet_name: String,
    breed_name: String,
    age: number,
    profile_image: File,
    price: number,
    description: String,
    seller_id: String
}

const SellPet = () => {
    const userInfo = useLocation();
    let animals: animalsPropsType = {} as animalsPropsType;
    let opt: availableOptionsType = availableOptions;
    const [name, setName] = useState('');
    const [petAge, setpetAge] = useState(10);
    const [pet, setPet] = useState('');
    const [breed, setBreed] = useState('Breed');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>();
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const navigate=useNavigate();

    Object.keys(opt).forEach((item: string) => {
        animals = {
            ...animals,
            [item]: opt[item].image
        }
    })
    const petSet = {
        pet, setPet
    }
    const breedSet = {
        pet: breed, setPet: setBreed
    }
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (hiddenFileInput && hiddenFileInput.current)
            hiddenFileInput.current?.click();
    };
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
            const fileName = v4();
            const imgref = ref(imageDB, `files/${fileName}`)
            const file = files[0]; // Get the first file from the list
            try {
                await uploadBytes(imgref, file);
                const downloadURL = await getDownloadURL(imgref);
                setImageURL(downloadURL);
            }
            catch (err) {
                console.log(err)
            }
        }
    };


    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // price === null || 
        if (name === '' || petAge === null || pet === '' || breed === '' || image === null || description === '') {
            inputErr();
        }
        else {
            const us_id: string = userInfo.state?.data.userid as string;
            if (image !== undefined && imageURL && us_id) {
                const payload = {
                    pet_name: pet,
                    breed_name: breed,
                    age: petAge,
                    profile_image: imageURL,
                    // price: price,
                    description: description,
                    Seller: userInfo.state.data.email
                }
                dispatch(postPetsdata(payload));
            }
            submitionSuccess()
            setName(""); setPet(""); setBreed(""); setpetAge(0); setDescription(''); setImage(null); setPrice(null);

        }
    }
    const dataSetProvider = () => {
        if (pet === "dogs")
            return Object.keys(breeds.dogs)
        else if (pet === "cats")
            return Object.keys(breeds.cats);
        else if (pet === "rabbits")
            return Object.keys(breeds.rabbits);
        else if (pet === "birds")
            return Object.keys(breeds.birds)
        else
            return ['breed']
    }
    useEffect(() => {
        dataSetProvider()
    }, [pet, breed])
    return (
        <div className={styles.addpet}>
            <form>
                <div>
                    <h3>Pet Selling Form</h3>
                    {/* <input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                    <input placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                    <Select dataSet={Object.keys(pets)} petSet={petSet} />
                    <Select dataSet={dataSetProvider()} state={pet !== '' ? "active" : "inactive"} petSet={breedSet} />
                    <div className={styles.addpet_range}>
                        <label>Pet Age:</label>
                        <input type='range' min={0} max={100} value={petAge} maxLength={99} onChange={(e) => setpetAge(parseInt(e.target.value))} />
                        <p>{petAge}</p>
                    </div>
                    {/* <input type='number' placeholder='Enter the price in ₹' value={price ? price : ''} onChange={(e) => setPrice(parseInt(e.target.value))} /> */}
                    <div className={styles.addpet_imageUpload}>
                        <p>{image ? "uploaded" : "Image of the pet"}</p>
                        <button className="button-upload" onClick={(e) => handleClick(e)}>
                            Upload
                        </button>
                    </div>
                    <input type='file' placeholder='Enter image' ref={hiddenFileInput} style={{ display: "none" }} onChange={(e) => handleImageChange(e)} />
                    <textarea placeholder='Enter about breed in 2 lines' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className={styles.button_section}>
                        <button className={styles.money} onClick={()=>navigate('/user/donatemoney')}>Donate Money</button>
                        <button className={styles.submit_button} onClick={submit}>Donate Pet</button>
                    </div>
                </div>
            </form>
            <ImageSlider animals={animals} />
        </div>
    )
}

export default SellPet
