export type DataWord = {
  child_name: string;
  child_spell: string;
  child_english_mean: string;
  child_vietnamese_mean: string;
  child_example: string;
  child_image_url: string;
  child_audio_url: string;
};
export type DataToeicProps = {
  order: string;
  name: string;

  image_url: string;
  child_link: string;
  data_child: DataWord[];
}[];

const dataToeic: DataToeicProps = require('./data.json');
export default dataToeic;
