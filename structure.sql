
CREATE TABLE appointment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT,
    patient_phone TEXT,
    doctor_id INTEGER,
    exam_id INTEGER,
    appointment TIMESTAMP,
    status TEXT,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    FOREIGN KEY (exam_id) REFERENCES exam(id)
);

CREATE TABLE doctor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    especialidade TEXT
);

CREATE TABLE exam (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT
    doctor_id INTEGER,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

CREATE TABLE doctor_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER UNIQUE,
    appts_per_hour TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    interval TEXT,
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);
