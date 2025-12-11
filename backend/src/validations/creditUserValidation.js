// validations/creditUser.zod.js
import { z } from "zod";

const applicantSchema = z.object({
  numberIdentity: z.string().min(16, "Nomor identitas wajib diisi"),
  name: z.string().min(4, "Nama pemohon wajib diisi"),
  placeOfBirth: z.string().min(3, "Tempat lahir wajib diisi"),
  // kalau frontend kirim string, enak pakai coerce.date()
  dateOfBirth: z.coerce.date({
    required_error: "Tanggal lahir wajib diisi",
    invalid_type_error: "Format tanggal lahir tidak valid",
  }),
  gender: z.enum(["Laki-laki", "Perempuan"]).default("Laki-laki"),
  phone: z.string().min(11, "Nomor HP wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  address: z.string().min(3, "Alamat wajib diisi"),
  village: z.string().min(3, "Desa/Kelurahan wajib diisi"),
  district: z.string().min(3, "Kecamatan wajib diisi"),
  city: z.string().min(3, "Kota/Kabupaten wajib diisi"),
  province: z.string().min(3, "Provinsi wajib diisi"),
  postalCode: z.string().min(6, "Kode Pos wajib diisi"),
  job: z.enum([
    "Pegawai Negeri Sipil",
    "Pegawai Swasta",
    "Pegawai BUMN",
    "Pegawai BUMD",
    "Pedagang",
    "Peternak",
    "Petani",
    "Wiraswasta/Wirausaha",
  ]).default("Pegawai Negeri Sipil"),
  workPlace: z.string().min(3, "Tempat kerja wajib diisi"),
  motherName: z.string().min(3, "Nama ibu wajib diisi"),
  photo: z.string().min(3, "Foto wajib diisi"),
  identityPhoto: z.string().min(3, "Foto identitas wajib diisi"),
  maritalStatus: z.enum(["Menikah", "Belum Menikah", "Janda", "Duda"])
    .default("Belum Menikah"),
  statusInFamily: z.enum(["Suami", "Istri", "Anggota Keluarga"])
    .default("Anggota Keluarga"),
});

const familySchema = z.object({
  identityNumber: z.string().min(16, "Nomor identitas keluarga wajib diisi"),
  name: z.string().min(3, "Nama keluarga wajib diisi"),
  dateOfBirth: z.coerce.date({
    required_error: "Tanggal lahir keluarga wajib diisi",
    invalid_type_error: "Format tanggal lahir keluarga tidak valid",
  }),
  statusOnFamily: z.enum(["Suami", "Istri", "Anggota Keluarga"])
    .default("Suami"),
  phone: z.string().min(16, "Nomor HP keluarga wajib diisi"),
  email: z.string().email("Format email keluarga tidak valid"),
  address: z.string().min(3, "Alamat keluarga wajib diisi"),
  photo: z.string().min(3, "Foto keluarga wajib diisi"),
  identityPhoto: z.string().min(11, "Foto identitas keluarga wajib diisi"),
  familyCard: z.string().min(16, "Kartu keluarga wajib diisi"),
});

const productSchema = z.object({
  creditType: z.enum([
    "Pilih jenis kredit",
    "Umum",
    "Sumeh (Maks 2jt)",
    "Wonogiren",
    "Kredit Elektronik",
    "Sumeh 4%",
    "Sumeh 5%",
    "Sumeh 6%",
  ]).default("Umum"),
  creditTerm: z.enum([
    "1 Bulan",
    "3 Bulan",
    "6 Bulan",
    "12 Bulan",
    "24 Bulan",
    "36 Bulan",
  ]).default("1 Bulan"),
  creditAmount: z.number({
    required_error: "Jumlah kredit wajib diisi",
    invalid_type_error: "Jumlah kredit harus angka",
  }),
  purpose: z.string().min(1, "Tujuan kredit wajib diisi"),
});

const incomeSchema = z.object({
  incomePicture: z.string().min(3, "Bukti pendapatan wajib diisi"),
  amount: z.number({
    required_error: "Pendapatan wajib diisi",
    invalid_type_error: "Pendapatan harus angka",
  }),
});

const outcomeSchema = z.object({
  amount: z.number({
    required_error: "Pengeluaran wajib diisi",
    invalid_type_error: "Pengeluaran harus angka",
  }),
});

export const createCreditUserSchema = z.object({
  applicant: applicantSchema,
  family: familySchema,
  product: productSchema,
  income: incomeSchema,
  outcome: outcomeSchema,
});

export const updateCreditUserSchema = createCreditUserSchema.partial();
