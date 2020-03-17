export interface ISubject {
    id: string;
    name: string;
}

export interface IPerson {
    name: string;
    phoneNumber: string;
    email: string;
    adress?: IAdress;
}

export interface IProfessor extends IPerson {
    id: string;             // teacherCode
    title: string;
    subjects: ISubject[];
}

export interface IStudent extends IPerson {
    id: string;             //studentNumber
    avgMark: string;
}

export interface IAdress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string
}