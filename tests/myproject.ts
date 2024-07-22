import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Myproject } from "../target/types/myproject";

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
});
