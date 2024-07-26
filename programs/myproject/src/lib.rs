use anchor_lang::prelude::*;

declare_id!("83vRX2VFADGmVkmNrukiGTgGkfr72EF6MnAo5NDaJznH");

#[program]
pub mod myproject {
    use super::*;

    pub fn initialize(ctx: Context<SetData>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        // ctx.accounts.new_account.item = data;
        // ctx.accounts.new_account.item = vec![];

        msg!("Greetings from: {:?} , {:?}", ctx.program_id, data);
        Ok(())
    }
    pub fn say_hello(_ctx: Context<HiData>, number: u32) -> Result<()> {
        msg!("pass number : {}", number);
        Ok(())
    }
    pub fn send_account(_ctx: Context<SetAcc>) -> Result<()> {
        Ok(())
    }

    pub fn set_data(ctx: Context<SetData>, number: u32) -> Result<()> {
        ctx.accounts.new_account.data = number as u64;
        Ok(())
    }
    pub fn add_todo(ctx: Context<AddItem>, task: String) -> Result<()> {
        let todo_account = &mut ctx.accounts.acc;
        todo_account.items.push(task);
        Ok(())
    }
    pub fn remove_todo_first(ctx: Context<AddItem>) -> Result<()> {
        let todo_account = &mut ctx.accounts.acc;
        // todo_account.items.retain(|x| x != &"test1".to_string());
        todo_account.items.remove(0);
        // todo_account.items = vec![];
        // todo_account.items.push("task".to_string());
        Ok(())
    }
}
#[derive(Accounts)]
pub struct SetAcc<'info> {
    #[account(mut)]
    pub acc: Account<'info, MyAccount>,
}

#[derive(Accounts)]
pub struct HiData {}

#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(init, payer = signer, space = 8 + 8 + 24+24)]
    pub new_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct MyAccount {
    data: u64,
    name: String,
    items: Vec<String>,
}

#[derive(Accounts)]
pub struct AddItem<'info> {
    // #[account(init, payer = signer, space = 8 )]
    #[account(mut)]
    pub acc: Account<'info, MyAccount>,
    // pub item: Account<'info, ToDoList>,
    // pub signer: Signer<'info>,
}

// #[account]
// #[derive(Default)]
// pub struct ToDoList {
//     item: u64,
// }
