use anchor_lang::prelude::*;

declare_id!("83vRX2VFADGmVkmNrukiGTgGkfr72EF6MnAo5NDaJznH");

#[program]
pub mod myproject {
    use super::*;

    pub fn initialize(ctx: Context<SetData>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        msg!("Greetings from: {:?} , {:?}", ctx.program_id, data);
        Ok(())
    }
    pub fn say_hello(_ctx: Context<HiData>, number: u32) -> Result<()> {
        msg!("pass number : {}", number);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct HiData {}

#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub new_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct MyAccount {
    data: u64,
}