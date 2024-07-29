import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Myproject } from "../target/types/myproject";
import { assert, expect } from "chai";

const { SystemProgram, PublicKey } = anchor.web3;
const provider = anchor.AnchorProvider.local();

describe("myproject", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const myAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.Myproject as Program<Myproject>;

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize(new anchor.BN(132312321)).accounts({
      newAccount: myAccount.publicKey,
      signer: provider.wallet.publicKey
    }).signers([myAccount]).rpc();

    console.log("Your transaction signature", tx);
    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).data);

  });
  it("test sayhi() rpc", async () => {
    const tx = await program.methods.sayHello(1111).rpc();
    console.log("Your transaction signature", tx);
  })
  it("test send_account() ", async () => {
    const tx = await program.methods.sendAccount().accounts({
      acc: myAccount.publicKey
    }).rpc();
    console.log("Your transaction signature", tx);

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).data);

  })
  it("add test todo list", async () => {
    const tx = await program.methods.addTodo("test1").accounts({
      acc: myAccount.publicKey,

    }).rpc();
    console.log("Your transaction signature", tx);

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).items);
    expect(myAcc.items.length).equal(1);

  })
  it("should return 3 when i add 3 element (old 1 and new 2)", async () => {
    await program.methods.addTodo("test2").accounts({
      acc: myAccount.publicKey,

    }).rpc();
    await program.methods.addTodo("test3").accounts({
      acc: myAccount.publicKey,
    }).rpc();

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).items);
    expect(myAcc.items.length).equals(3);
  })
  it("should return 2 when I remove element", async () => {
    await program.methods.removeTodoFirst().accounts({
      acc: myAccount.publicKey,
    }).rpc();

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).items);
    expect(myAcc.items.length).equals(2);
  })
  it("should return 0 when I call clear rpc", async () => {
    await program.methods.clearAll().accounts({
      acc: myAccount.publicKey,
    }).rpc();

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log((myAcc).items);
    expect(myAcc.items.length).equals(0);
  })

  it("another account should not receive data when I change account", async () => {
    const other = anchor.web3.Keypair.generate();
    const tx = await program.methods.initialize(new anchor.BN(4343234234)).accounts({
      newAccount: other.publicKey,
      signer: provider.wallet.publicKey
    }).signers([other]).rpc();

    const acc = await program.account.myAccount.fetch(other.publicKey);
    console.log((acc).items);
    expect(acc.items.length).equals(0);
  })
});
