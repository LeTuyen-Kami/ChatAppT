const popularWords = [
  'là',
  'và',
  'của',
  'có',
  'trong',
  'được',
  'cho',
  'đã',
  'ở',
  'không',
  'như',
  'để',
  'này',
  'nhiều',
  'với',
  'làm',
  'cũng',
  'vào',
  'đang',
  'đó',
  'khi',
  'để',
  'người',
  'cách',
  'nhưng',
  'hay',
  'đến',
  'thì',
  'một',
  'nữa',
  'sau',
  'này',
  'điều',
  'lên',
  'từ',
  'nếu',
  'vì',
  'thế',
  'nên',
  'được',
  'ra',
  'trên',
  'còn',
  'đi',
  'những',
  'đến',
  'quá',
  'đầu',
  'theo',
  'trước',
  'phải',
  'lại',
  'nào',
  'cùng',
  'mới',
  'biết',
  'đúng',
  'tất',
  'tất cả',
  'chỉ',
  'được',
  'mình',
  'họ',
  'trở',
  'nhà',
  'nên',
  'cả',
  'tôi',
  'thêm',
  'điều',
  'nhiều',
  'mà',
  'vào',
  'bị',
  'điều',
  'về',
  'như',
  'khác',
  'nên',
  'vẫn',
  'từng',
  'ra',
  'tới',
  'tự',
  'bởi',
  'trước khi',
  'đã từng',
  'có thể',
  'lại',
  'khác nhau',
  'càng',
  'lúc',
  'vì vậy',
];

const popularVerbs = [
  'làm',
  'có',
  'được',
  'hỏi',
  'nói',
  'đi',
  'xem',
  'cần',
  'gọi',
  'suy nghĩ',
  'cho',
  'đặt',
  'học',
  'mua',
  'chơi',
  'sử dụng',
  'chỉ định',
  'bắt đầu',
  'tải',
  'thiết lập',
  'đồng ý',
  'đăng nhập',
  'nhắn tin',
  'tính',
  'chỉnh sửa',
  'khởi tạo',
  'tính toán',
  'giải quyết',
  'thực hiện',
  'gửi',
  'quản lý',
  'cài đặt',
  'chọn',
  'chuyển đổi',
  'điều khiển',
  'tính toán',
  'tái cấu trúc',
  'cập nhật',
  'tìm kiếm',
  'sửa chữa',
  'thiết lập lại',
  'tối ưu hóa',
  'sử dụng lại',
  'gắn kết',
  'thay đổi',
  'đọc',
  'gửi đi',
  'truyền đạt',
  'phân tích',
  'ghi chép',
  'tổ chức',
  'thực hành',
  'tạo ra',
  'phân loại',
  'phân biệt',
  'phân rã',
  'phân tách',
  'phát triển',
  'thiết kế',
  'tìm ra',
  'mang lại',
];

const popularNouns = [
  'công việc',
  'thời gian',
  'cuộc sống',
  'tình yêu',
  'người',
  'nước',
  'trẻ em',
  'chính phủ',
  'quốc gia',
  'trường học',
  'nhân viên',
  'phòng',
  'phòng khách',
  'phòng ngủ',
  'nhà bếp',
  'bàn ăn',
  'cửa hàng',
  'điện thoại',
  'máy tính',
  'máy ảnh',
  'tivi',
  'tủ lạnh',
  'ô tô',
  'xe máy',
  'xe đạp',
  'mô tô',
  'đường phố',
  'bầu trời',
  'thiên nhiên',
  'sức khỏe',
  'đồ uống',
  'thức ăn',
  'sách',
  'tạp chí',
  'báo',
  'điện ảnh',
  'âm nhạc',
  'văn học',
  'khoa học',
  'chính trị',
  'kinh tế',
  'nghệ thuật',
  'thể thao',
  'địa điểm',
  'quyền lợi',
  'nhiệm vụ',
  'kế hoạch',
  'cơ hội',
  'thách thức',
  'thành tích',
  'tài sản',
  'văn phòng phẩm',
  'khoảng cách',
  'giá trị',
  'khả năng',
  'điều kiện',
  'dữ',
];

const generateParagraph = (numWords: number) => {
  let paragraph = '';
  for (let i = 0; i < numWords; i++) {
    const random = Math.floor(Math.random() * 100);
    if (random < 10) {
      paragraph +=
        popularVerbs[Math.floor(Math.random() * popularVerbs.length)];
    } else if (random < 20) {
      paragraph +=
        popularNouns[Math.floor(Math.random() * popularNouns.length)];
    } else {
      paragraph +=
        popularWords[Math.floor(Math.random() * popularWords.length)];
    }
    paragraph += ' ';
  }
  return paragraph;
};

const styleForParagraph = (
  paragraph: string,
  type: 'obj' | 'markdown' = 'obj',
) => {
  //example: takes in a string returns an array of objects include text and style, style is "i" or "b" or undefined,style have key is "s", string is random slice of the paragraph
  //input: "đi học hỏi nói chuyện với bạn bè tại trường học"
  //output: [{text: "đi học", s:"i"},{text: "hỏi nói chuyện với bạn bè tại trường học", s:"b"}]

  const randomSlice = Math.floor(Math.random() * 5) + 1;
  const listrandomIndex = [];
  for (let i = 0; i < randomSlice; i++) {
    listrandomIndex.push(Math.floor(Math.random() * paragraph.length));
  }
  listrandomIndex.sort((a, b) => a - b);
  const listSlice = [];
  for (let i = 0; i < listrandomIndex.length; i++) {
    if (i === 0) {
      listSlice.push(paragraph.slice(0, listrandomIndex[i]));
    } else {
      listSlice.push(
        paragraph.slice(listrandomIndex[i - 1], listrandomIndex[i]),
      );
    }
  }
  listSlice.push(paragraph.slice(listrandomIndex[listrandomIndex.length - 1]));
  let listStyle: any = type === 'markdown' ? '' : [];
  for (let i = 0; i < listSlice.length; i++) {
    const random = Math.floor(Math.random() * 100);
    if (random < 10) {
      if (type === 'markdown') {
        listStyle += `*${listSlice[i]}*`;
      } else {
        listStyle.push({text: listSlice[i], s: 'i'});
      }
    } else if (random < 20) {
      if (type === 'markdown') {
        listStyle += `**${listSlice[i]}**`;
      } else {
        listStyle.push({text: listSlice[i], s: 'b'});
      }
    } else {
      if (type === 'markdown') {
        listStyle += listSlice[i];
      } else {
        listStyle.push({text: listSlice[i]});
      }
    }
  }
  return listStyle;
};

export const generateChapterAsync = async (numParagraph?: number) => {
  const num = Math.floor(Math.random() * (numParagraph || 50)) + 50;
  //random from 3000 words to 5000 words
  let numWords = Math.floor(Math.random() * 2000) + 3000;
  //one paragraph have 50 to 100 words
  const listResult = [] as any[];
  while (numWords > 0) {
    const paragraph = generateParagraph(Math.floor(Math.random() * 50) + 50);
    listResult.push(styleForParagraph(paragraph));
    numWords -= 50;
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(listResult);
    }, Math.floor(Math.random() * 300) + 300);
  });
};

export const generateChapter = (style: 'obj' | 'markdown' = 'obj') => {
  //random from 3000 words to 5000 words
  let numWords = Math.floor(Math.random() * 2000) + 3000;
  //one paragraph have 50 to 100 words
  let listResult: any = style === 'markdown' ? '' : [];
  while (numWords > 0) {
    const paragraph = generateParagraph(Math.floor(Math.random() * 50) + 50);
    if (style === 'markdown') {
      listResult += `${styleForParagraph(paragraph, style)}\n\n`;
    } else {
      listResult.push(styleForParagraph(paragraph, style));
    }
    numWords -= 50;
  }

  return listResult;
};

class generateBook {
  private readonly listChapter: any[];

  constructor() {
    this.listChapter = [];
  }

  getBookAsync = async (index: number, numParagraph?: number) => {
    if (this.listChapter[index]) {
      return this.listChapter[index];
    } else {
      const chapter = await generateChapterAsync(numParagraph);
      this.listChapter[index] = chapter;
      return chapter;
    }
  };
  getBook = (index: number) => {
    if (this.listChapter[index]) {
      return this.listChapter[index];
    } else {
      const chapter = generateChapter();
      this.listChapter[index] = chapter;
      return chapter;
    }
  };
}

export const book = new generateBook();
