import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(""),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState('');

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  const categories = [
    { id: 'tops', value: 1, name: 'トップス' },
    { id: 'shirts', value: 2, name: 'シャツ' },
    { id: 'pants', value: 3, name: 'パンツ' },
  ];

  const genders = [
    { id: 'all', value: 1, name: 'すべて' },
    { id: 'male', value: 2, name: 'メンズ' },
    { id: 'female', value: 3, name: 'レディース' }
  ];

  const uploadImage = useCallback((event) => {
    const file = event.target.file;
    let blob = new Blob(file, { type: "iamge/jpeg" });

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');

    // const uploadRef = storage;
  });

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"商品名"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput
          fullWidth={true} label={"商品説明"} multiline={true} required={true} onChange={inputDescription} rows={5} value={description} type={"text"}
        />
        <SelectBox
          label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
        ></SelectBox>
        <SelectBox
          label={"性別"} required={true} options={genders} select={setGender} value={gender}
        ></SelectBox>
        <TextInput
          fullWidth={true} label={"価格"} multiline={false} required={true} onChange={inputPrice} rows={1} value={price} type={"number"}
        />
        <div className="module-spacer--medium"></div>
        <div className='center'>
          <PrimaryButton label={"商品情報を保存"} onClick={() => dispatch(saveProduct(name, description, category, gender, price))} />
        </div>
      </div>

    </section>
  );
};

export default ProductEdit;