export interface IReviewModalProps {
  title: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
}

export interface IReviewFilterItemProps {
  title: string;
  content: string[];
}

export interface IMainContentsProps {
  thumnail: string;
}
