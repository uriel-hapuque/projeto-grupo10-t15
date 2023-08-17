import { ChangeEvent, useContext, useState } from "react"
import { UserContext } from "../../providers"
import { SubmitHandler, useForm } from "react-hook-form"
import {IUserRegister } from "../../providers/interfaces"
import { Input } from "../Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { RegisterData, RegisterSchema } from "../../pages/Register/schema"

export const RegisterForm = () =>{
    const {registerUser} = useContext(UserContext)
    const [userType, setUserType] = useState("")
    const {register, handleSubmit,formState:{errors},watch,} = useForm<RegisterData>({
        resolver:zodResolver(RegisterSchema)
    })
    const password = watch("password")
    const confirmPassword = watch("confirmPassword")
    const handleUserTypeChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserType(event.target.value);
      };
    

    const submit:SubmitHandler<IUserRegister> = (data) =>{
        data.type_account = userType
        registerUser(data)
    }
        return(
           <main>
               <h2>Cadastro</h2>
               <p>Informações pessoais</p>
               <form onSubmit={handleSubmit(submit)}>
                    <Input
                        label="Nome"
                        placeholder="Ex: Lucas Ribeiro"
                        register={register("name")}
                        error={errors.name}
                        type="text"
                        id="name"
                    />
                    <Input
                        label="Email"
                        placeholder="Ex: lucasribeiro@mail.com"
                        register={register("email")}
                        error={errors.email}
                        type="email"
                        id="email"
                    />
                    <Input
                        label="CPF"
                        placeholder="000.000.000-00"
                        register={register("cpf")}
                        error={errors.cpf}
                        type="text"
                        id="cpf"
                    />
                    <Input
                        label="Celular"
                        placeholder="(DDD) 9999-9999"
                        register={register("contact_number")}
                        error={errors.contact_number}
                        type="text"
                        id="contact_number"
                    />
                    <Input
                        label="Data de nascimento"
                        placeholder="00/00/00"
                        register={register("birthdate")}
                        type="text"
                        id="birthdate"
                    />
                    <Input
                        label="Descrição"
                        placeholder="Degitar descrição"
                        register={register("description")}
                        type="text"
                        id="description"
                    />
                    <p>Informações de endereço</p>
                    <Input
                        label="CEP"
                        placeholder="00000.000"
                        register={register("zipCode")}
                        type="text"
                        id="zipcode"
                    />
                    <Input
                        label="Estado"
                        placeholder="Digitar Estado"
                        register={register("state")}
                        type="text"
                        id="state"
                    />
                    <Input
                        label="Cidade"
                        placeholder="Digitar cidade"
                        register={register("city")}
                        type="text"
                        id="city"
                    />
                    <Input
                        label="Rua"
                        placeholder="Digitar rua"
                        register={register("street")}
                        type="text"
                        id="street"
                    />
                    <Input
                        label="Número"
                        placeholder="Digitar número"
                        register={register("number")}
                        type="text"
                        id="number"
                    />
                    <Input
                        label="Complemento"
                        placeholder="Ex: ap 101"
                        register={register("complement")}
                        type="text"
                        id="complement"
                    />
                    <label>
                        <input
                            type="radio"
                            value="Comprador"
                            checked={userType === "comprador"}
                            {...register("type_account")}
                            onChange={handleUserTypeChange}
                            name="userType"
                        />
                        Comprador
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Anunciante"
                            checked={userType === "Anunciante"}
                            onChange={handleUserTypeChange}
                            name="userType"
                        />
                        Anunciante
                    </label>
                    <Input
                        label="Senha"
                        placeholder="Digitar senha"
                        register={register("password")}
                        type="password"
                        id="password"
                    />
                    <Input
                        label="Confirmar senha"
                        placeholder="Digitar senha novamente"
                        register={register("confirmPassword")}
                        error={errors.confirmPassword}
                        type="password"
                        id="confirmPass"
                    />
                    {password !== confirmPassword && <p>As senhas não coincidem</p>}
                    <Link to="/login">
                        <button type="submit">Finalizar cadastro</button>
                    </Link>
               </form> 
           </main>
        )

    }